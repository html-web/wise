import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { getAuthUser } from "./users.ts";

export const listMyTransactions = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const user = await getAuthUser(ctx);
    if (!user) throw new ConvexError({ code: "UNAUTHENTICATED", message: "Not logged in" });
    return ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const listAllTransactions = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const user = await getAuthUser(ctx);
    if (!user || (user.role ?? "user") !== "admin") {
      throw new ConvexError({ code: "FORBIDDEN", message: "Admin only" });
    }
    return ctx.db.query("transactions").order("desc").paginate(args.paginationOpts);
  },
});

export const updateTransactionStatus = mutation({
  args: {
    txId: v.id("transactions"),
    status: v.union(
      v.literal("completed"),
      v.literal("pending"),
      v.literal("rejected"),
      v.literal("on_hold"),
    ),
    adminNote: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<void> => {
    const me = await getAuthUser(ctx);
    if (!me || (me.role ?? "user") !== "admin") {
      throw new ConvexError({ code: "FORBIDDEN", message: "Admin only" });
    }
    const tx = await ctx.db.get(args.txId);
    if (!tx) throw new ConvexError({ code: "NOT_FOUND", message: "Transaction not found" });

    await ctx.db.patch(args.txId, {
      status: args.status,
      adminNote: args.adminNote ?? tx.adminNote,
    });

    const statusLabel = args.status === "completed" ? "approved" : args.status === "rejected" ? "rejected" : args.status === "on_hold" ? "placed on hold" : "updated";
    await ctx.db.insert("notifications", {
      userId: tx.userId,
      title: "Transfer update",
      message: `Your transfer has been ${statusLabel}.${args.adminNote ? ` Note: ${args.adminNote}` : ""}`,
      read: false,
      type: "transaction",
    });
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthUser(ctx);
    if (!user || (user.role ?? "user") !== "admin") {
      throw new ConvexError({ code: "FORBIDDEN", message: "Admin only" });
    }
    const allTx = await ctx.db.query("transactions").collect();
    return {
      total: allTx.length,
      pending: allTx.filter((t) => t.status === "pending").length,
      onHold: allTx.filter((t) => t.status === "on_hold").length,
      highRisk: allTx.filter((t) => t.riskScore >= 70).length,
    };
  },
});
