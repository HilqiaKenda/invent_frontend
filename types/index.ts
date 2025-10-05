import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Shared types
export type Timestamp = string; // ISO datetime strings from Django
export type DecimalStr = string; // Django Decimal is usually serialized as string

// ================== Category ==================
export interface Category {
  id: number;
  name: string;
  description?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ================== Supplier ==================
export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// ================== Product ==================
export interface ProductListItem {
  id: number;
  name: string;
  category: Category;
  suppliers: Supplier[];
  description?: string | null;
  price: DecimalStr;
  sku?: string | null;
  is_active: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  in_stock: boolean;
  inventory?: Inventory; // Optional because it may not always be included in API
}

// ================== ProductSupplier ==================
export interface ProductSupplier {
  id: number;
  product: ProductListItem;
  supplier: Supplier;
  supplier_price: DecimalStr;
  is_primary: boolean;
  created_at: Timestamp;
}

// ================== Inventory ==================
export interface Inventory {
  id: number;
  product: ProductListItem;
  quantity: number;
  reserved_quantity: number;
  reorder_level: number;
  updated_at: Timestamp;
  available_quantity: number;
}

// ================== UserProfile ==================
export interface UserProfile {
  id: number;
  user: User;
  phone?: string | null;
  address?: string | null;
  date_of_birth?: string | null; // ISO date string
  created_at: Timestamp;
  updated_at: Timestamp;
}

// Minimal User type (extendable)
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

// ================== Cart ==================
export interface Cart {
  id: number;
  user: User;
  created_at: Timestamp;
  updated_at: Timestamp;
  total_items: number;
  total_price: DecimalStr;
  items: CartItem[];
}

// ================== CartItem ==================
export interface CartItem {
  id: number;
  cart: number; // cart id (or full Cart if API expands it)
  product: ProductListItem;
  quantity: number;
  created_at: Timestamp;
  updated_at: Timestamp;
  total_price: DecimalStr;
}

// ================== Order ==================
export type OrderStatus =
  | "P" // Pending
  | "C" // Confirmed
  | "PR" // Processing
  | "S" // Shipped
  | "D" // Delivered
  | "CA" // Cancelled
  | "R"; // Returned

export interface Order {
  id: number;
  user: User | null;
  order_number: string;
  status: OrderStatus;
  shipping_address?: string | null;
  shipping_phone: string;
  subtotal: DecimalStr;
  shipping_cost: DecimalStr;
  tax_amount: DecimalStr;
  total_amount: DecimalStr;
  order_date: Timestamp;
  shipped_date?: Timestamp | null;
  delivered_date?: Timestamp | null;
  updated_at: Timestamp;
  notes?: string | null;
  total_items: number;
  items: OrderItem[];
}

// ================== OrderItem ==================
export interface OrderItem {
  id: number;
  order: number; // order id (or full Order if expanded)
  product: ProductListItem;
  quantity: number;
  unit_price: DecimalStr;
  created_at: Timestamp;
  total_price: DecimalStr;
}
