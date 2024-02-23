export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      discounts: {
        Row: {
          discountPercent: number
          gameId: number
          id: number
          lastChecked: string
        }
        Insert: {
          discountPercent?: number
          gameId: number
          id?: number
          lastChecked?: string
        }
        Update: {
          discountPercent?: number
          gameId?: number
          id?: number
          lastChecked?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_discounts_gameId_fkey"
            columns: ["gameId"]
            isOneToOne: true
            referencedRelation: "games"
            referencedColumns: ["id"]
          }
        ]
      }
      games: {
        Row: {
          genre: string
          hasEnglishVO: string | null
          id: number
          isAuthorized: boolean
          isSeconded: boolean | null
          msrp: string
          notes: string | null
          recBy: string
          recTo: string
          storeLink: string | null
          title: string
          userScore: string | null
          vodLink: string | null
          wasCompleted: boolean
        }
        Insert: {
          genre: string
          hasEnglishVO?: string | null
          id?: number
          isAuthorized?: boolean
          isSeconded?: boolean | null
          msrp: string
          notes?: string | null
          recBy: string
          recTo: string
          storeLink?: string | null
          title: string
          userScore?: string | null
          vodLink?: string | null
          wasCompleted?: boolean
        }
        Update: {
          genre?: string
          hasEnglishVO?: string | null
          id?: number
          isAuthorized?: boolean
          isSeconded?: boolean | null
          msrp?: string
          notes?: string | null
          recBy?: string
          recTo?: string
          storeLink?: string | null
          title?: string
          userScore?: string | null
          vodLink?: string | null
          wasCompleted?: boolean
        }
        Relationships: []
      }
      games_duplicate: {
        Row: {
          genre: string | null
          hasEnglishVO: string | null
          id: number
          isAuthorized: boolean
          isSeconded: boolean | null
          msrp: string | null
          notes: string | null
          recBy: string | null
          recTo: string | null
          storeLink: string | null
          title: string
          userScore: string | null
          vodLink: string | null
          wasCompleted: boolean | null
        }
        Insert: {
          genre?: string | null
          hasEnglishVO?: string | null
          id?: number
          isAuthorized?: boolean
          isSeconded?: boolean | null
          msrp?: string | null
          notes?: string | null
          recBy?: string | null
          recTo?: string | null
          storeLink?: string | null
          title: string
          userScore?: string | null
          vodLink?: string | null
          wasCompleted?: boolean | null
        }
        Update: {
          genre?: string | null
          hasEnglishVO?: string | null
          id?: number
          isAuthorized?: boolean
          isSeconded?: boolean | null
          msrp?: string | null
          notes?: string | null
          recBy?: string | null
          recTo?: string | null
          storeLink?: string | null
          title?: string
          userScore?: string | null
          vodLink?: string | null
          wasCompleted?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
