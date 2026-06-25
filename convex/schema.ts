import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    // Multi-currency balances stored as cents (optional for backward compat with existing rows)
    balanceGBP: v.optional(v.number()),
    balanceUSD: v.optional(v.number()),
    balanceEUR: v.optional(v.number()),
    role: v.optional(v.union(v.literal("user"), v.literal("admin"), v.literal("support"))),
    kycStatus: v.optional(v.union(
      v.literal("verified"),
      v.literal("pending"),
      v.literal("rejected"),
      v.literal("not_submitted"),
    )),
    isActive: v.optional(v.boolean()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]),

  transactions: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("send"), v.literal("receive"), v.literal("admin_credit"), v.literal("admin_debit")),
    fromCurrency: v.string(),
    toCurrency: v.string(),
    amount: v.number(),
    convertedAmount: v.number(),
    exchangeRate: v.number(),
    fee: v.number(),
    status: v.union(
      v.literal("completed"),
      v.literal("pending"),
      v.literal("rejected"),
      v.literal("on_hold"),
    ),
    riskScore: v.number(),
    recipientName: v.optional(v.string()),
    recipientEmail: v.optional(v.string()),
    note: v.optional(v.string()),
    adminNote: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_and_status", ["userId", "status"]),

  notifications: defineTable({
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
    read: v.boolean(),
    type: v.union(v.literal("transaction"), v.literal("admin"), v.literal("system")),
  }).index("by_user", ["userId"]).index("by_user_and_read", ["userId", "read"]),
});
