export type Winner = {
  id: string;
  name: string;
  prize: string;
  location: string;
  imageUrl: string;
  announcedAt: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type WinnerInput = {
  name: string;
  prize: string;
  location?: string;
  imageUrl?: string;
  announcedAt?: string;
  isPublished?: boolean;
};

export type Prize = {
  id: string;
  drawDate: string;
  imageUrl: string;
  imageKey: string;
  points: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PrizeInput = {
  drawDate: string;
  imageUrl?: string;
  imageKey?: string;
  points: string[];
  isPublished?: boolean;
};

export type MembershipPlan = "none" | "silver" | "gold";

export type SubscriberStatus = "active" | "unsubscribed";

export type Subscriber = {
  id: string;
  email: string;
  plan: MembershipPlan;
  source: string;
  status: SubscriberStatus;
  createdAt: string;
};

export type SubscriberUpdateInput = {
  plan?: MembershipPlan;
  status?: SubscriberStatus;
};

export type UserStatus = "active" | "blocked";

export type UserRole = "user" | "admin";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  plan: MembershipPlan;
  status: UserStatus;
  role: UserRole;
  joinedAt: string;
  updatedAt: string;
};

export type UserUpdateInput = {
  name?: string;
  plan?: MembershipPlan;
  status?: UserStatus;
  role?: UserRole;
};

export type SubscriptionStatus = "active" | "expired";

export type Subscription = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: MembershipPlan;
  status: SubscriptionStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionUpdateInput = {
  plan?: MembershipPlan;
  status?: SubscriptionStatus;
  expiresAt?: string;
  extendDays?: number;
};

export type PaymentStatus = "success" | "failed" | "pending";

export type Payment = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  plan: MembershipPlan;
  paymentId: string;
  status: PaymentStatus;
  createdAt: string;
};

export type AdminContentStore = {
  winners: Winner[];
  prizes: Prize[];
  subscribers: Subscriber[];
  users: AdminUser[];
  subscriptions: Subscription[];
  payments: Payment[];
};
