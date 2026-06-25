import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel.d.ts";

export async function getAuthUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .unique();
}

export const updateCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({ code: "UNAUTHENTICATED", message: "User not logged in" });
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (user !== null) {
      await ctx.db.patch(user._id, {
        name: identity.name ?? user.name,
        email: identity.email ?? user.email,
      });
      return user._id;
    }

    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      name: identity.name,
      email: identity.email,
      balanceGBP: 124508400,
      balanceUSD: 83205000,
      balanceEUR: 39102000,
      role: "user",
      kycStatus: "not_submitted",
      isActive: true,
    });
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
  },
});

export const listAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const me = await getAuthUser(ctx);
    if (!me || (me.role ?? "user") !== "admin") {
      throw new ConvexError({ code: "FORBIDDEN", message: "Admin only" });
    }
    return ctx.db.query("users").collect();
  },
});

export const updateUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("admin"), v.literal("support")),
  },
  handler: async (ctx, args) => {
    const me = await getAuthUser(ctx);
    if (!me || (me.role ?? "user") !== "admin") {
      throw new ConvexError({ code: "FORBIDDEN", message: "Admin only" });
    }
    await ctx.db.patch(args.userId, { role: args.role });
  },
});

export const updateKycStatus = mutation({
  args: {
    userId: v.id("users"),
    kycStatus: v.union(
      v.literal("verified"),
      v.literal("pending"),
      v.literal("rejected"),
      v.literal("not_submitted"),
    ),
  },
  handler: async (ctx, args) => {
    const me = await getAuthUser(ctx);
    if (!me || (me.role ?? "user") !== "admin") {
      throw new ConvexError({ code: "FORBIDDEN", message: "Admin only" });
    }
    await ctx.db.patch(args.userId, { kycStatus: args.kycStatus });
  },
});

export const adminAdjustBalance = mutation({
  args: {
    userId: v.id("users"),
    currency: v.union(v.literal("GBP"), v.literal("USD"), v.literal("EUR")),
    amountCents: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<void> => {
    const me = await getAuthUser(ctx);
    if (!me || (me.role ?? "user") !== "admin") {
      throw new ConvexError({ code: "FORBIDDEN", message: "Admin only" });
    }
    const user = await ctx.db.get(args.userId);
    if (!user) throw new ConvexError({ code: "NOT_FOUND", message: "User not found" });

    const field = args.currency === "GBP" ? "balanceGBP" : args.currency === "USD" ? "balanceUSD" : "balanceEUR";
    const current = user[field] ?? 0;
    const next = current + args.amountCents;

    if (next < 0) {
      throw new ConvexError({ code: "BAD_REQUEST", message: "Insufficient balance for deduction" });
    }

    await ctx.db.patch(args.userId, { [field]: next });

    const type = args.amountCents >= 0 ? "admin_credit" : "admin_debit";
    await ctx.db.insert("transactions", {
      userId: args.userId,
      type,
      fromCurrency: args.currency,
      toCurrency: args.currency,
      amount: Math.abs(args.amountCents),
      convertedAmount: Math.abs(args.amountCents),
      exchangeRate: 1,
      fee: 0,
      status: "completed",
      riskScore: 0,
      note: args.note ?? (type === "admin_credit" ? "Admin credit" : "Admin debit"),
      adminNote: `Adjusted by admin ${me.name ?? me.email ?? me._id}`,
    });

    const symbol = args.currency === "GBP" ? "\u00a3" : args.currency === "USD" ? "$" : "\u20ac";
    const absAmount = (Math.abs(args.amountCents) / 100).toFixed(2);
    const action = args.amountCents >= 0 ? "credited" : "debited";
    await ctx.db.insert("notifications", {
      userId: args.userId,
      title: `Balance ${action}`,
      message: `${symbol}${absAmount} has been ${action} to your ${args.currency} account${args.note ? `: ${args.note}` : "."}`,
      read: false,
      type: "admin",
    });
  },
});
