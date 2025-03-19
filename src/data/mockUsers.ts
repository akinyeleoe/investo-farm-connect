
import { UserWithPassword } from "@/types/user";

// Mock user data for demonstration
export const mockUsers: UserWithPassword[] = [
  {
    id: '1',
    email: 'admin@farmly.ng',
    name: 'Admin User',
    password: 'password123',
    isAdmin: true,
    referralCode: 'ADMIN001',
    referredBy: null,
    balance: 0,
    investments: [],
  },
  {
    id: '2',
    email: 'investor@example.com',
    name: 'Demo Investor',
    password: 'password123',
    isAdmin: false,
    referralCode: 'INV002',
    referredBy: null,
    balance: 0,
    investments: [],
  },
];
