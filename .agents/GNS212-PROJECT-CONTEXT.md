# GNS 212 AI Teaching Assistant — Project Context

## Overview

A web-based AI chatbot for students enrolled in **GNS 212** at the **University of Ilorin**. Students ask questions about the course and receive answers grounded exclusively in the official GNS 212 textbook, with exact page number and chapter citations. Uses **RAG (Retrieval-Augmented Generation)** architecture.

---

## Tech Stack

| Layer              | Technology                                       |
| ------------------ | ------------------------------------------------ |
| Frontend + Backend | Next.js 15 (App Router + API Routes)             |
| Language           | TypeScript                                       |
| Styling            | Tailwind CSS v4 + shadcn/ui (Radix, Nova preset) |
| State Management   | Redux Toolkit (RTK) — _to install later_         |
| Auth               | Supabase Auth — _to install_                     |
| Database           | Supabase (PostgreSQL + pgvector) — _to install_  |
| AI Engine          | Google Gemini 1.5 Flash — _to install_           |
| Embeddings         | Google text-embedding-004 — _to install_         |
| Hosting            | Vercel (free tier)                               |

---

## Color Scheme (Navy + Gold)

### Light Mode

```
--navy:           #0D2349
--navy-mid:       #1A3A6B
--gold:           #C9952A
--gold-light:     #FDF3DC
--bg:             #FFFFFF
--bg-surface:     #F7F8FC
--bg-page:        #EEF1F8
--text-primary:   #0D2349
--text-secondary: #4A5568
```

### Dark Mode

```
--navy:           #4A7FD4
--navy-mid:       #2D5BA8
--gold:           #E8B84B
--gold-light:     #2A2010
--bg:             #0D1B33
--bg-surface:     #162040
--bg-page:        #0A1525
--text-primary:   #E8EDF7
```

---

## Typography

- **Body font:** Inter (Google Fonts)
- **Heading font:** Merriweather (Google Fonts)
- **Base scale:** `html { font-size: 62.5% }` → `1rem = 10px`
- **Body text:** 16px (`1.6rem`)

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx          # Dynamic auth layout (logo, buttons, footer)
│   │   ├── login/page.tsx
│   │   └── create-account/page.tsx
│   ├── (main)/
│   │   ├── layout.tsx
│   │   └── chat/page.tsx       # RAG chat interface (IN PROGRESS)
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   └── page.tsx                # Redirect to /login
├── components/
│   ├── ui/                     # shadcn (auto-generated, do not edit)
│   │   ├── button/index.tsx    # Custom navy variant
│   │   └── icons/              # Eye, Google SVGs
│   ├── inputs/                 # Custom input wrappers
│   ├── auth/                   # LoginForm, CreateAccountForm
│   └── chat/                   # Chat UI components (IN PROGRESS)
├── store/                      # Redux Toolkit (NOT INSTALLED YET)
├── lib/                        # utils.ts, supabase.ts (NOT CREATED)
└── types/                      # auth.ts, chat.ts (NOT CREATED)
```

---

## Key Conventions

### CSS Variables

```tsx
className = "text-[var(--text-primary)]"; // ✅ CORRECT
className = "text-[--text-primary]"; // ❌ WRONG
```

### Client Components

Add `"use client"` if using:

- React hooks (`useState`, `useEffect`, etc.)
- Next.js hooks (`usePathname`, `useRouter`)
- Redux hooks (`useSelector`, `useDispatch`)
- Event handlers

### SVG Icons

All attributes must be camelCase:

```tsx
strokeWidth="1.5" strokeLinecap="round" fillRule="evenodd"  // ✅ CORRECT
stroke-width="1.5" stroke-linecap="round"                   // ❌ WRONG
```

### Button Variants

- `variant="navy"` — primary action
- `variant="outline"` — secondary (Google sign-in)
- `variant="ghost"` — tertiary

---

## Pages

### Auth Pages

#### `/login`

- Email + password
- Forgot password link (gold)
- Sign in button (navy, full width)
- Google sign in button (outline)
- Footer link → create-account

#### `/create-account`

- First name + last name (2-column)
- Email
- Password + confirm password
- Create account button (navy, full width)
- Google sign in button (outline)
- Footer link → login

### Chat Page (`/chat`)

- Navy header with logo + dark mode toggle
- Sidebar with conversation history
- Chat window with message bubbles
- Bot responses with gold citations (Chapter X, Page Y)
- Suggested questions
- Typing indicator
- Message input with send button

---

## RAG Pipeline (Phase 2+)

1. Textbook PDF → chunked + embedded with Google text-embedding-004
2. Embeddings stored in Supabase pgvector with metadata
3. On query:
   - Embed query
   - pgvector retrieves top-k chunks
   - Send chunks + query to Gemini 1.5 Flash
   - Gemini generates answer with citations
   - Return response with chapter/page references

---

## Development Phases

| Phase                              | Status          |
| ---------------------------------- | --------------- |
| Phase 1: Setup, routing, auth UI   | **IN PROGRESS** |
| Phase 2: Supabase auth integration | Pending         |
| Phase 3: Chat UI components        | Pending         |
| Phase 4: RAG pipeline              | Pending         |
| Phase 5: Gemini integration        | Pending         |
| Phase 6: Conversation history      | Pending         |
| Phase 7: Testing & docs            | Pending         |

---

## Current Status

- ✅ Next.js 15 project initialized
- ✅ Tailwind v4 + shadcn/ui configured
- ✅ Google Fonts (Inter, Merriweather) loaded
- ✅ Auth layout structure created
- ✅ Custom Button component with navy variant
- ✅ Basic routing: `/login` and `/create-account`
- ❌ Forms not wired yet (no Redux)
- ❌ Supabase not integrated
- ❌ Chat page not started

---

## Important Notes

- Next.js **15 App Router** (not Pages Router)
- Tailwind **v4** uses `@import "tailwindcss"` (new syntax)
- Dark mode via `.dark` class on `<html>`
- Custom inputs wrap shadcn primitives (do not edit shadcn directly)
- `(auth)` layout uses `usePathname()` to render dynamic buttons
- CSS variables use `var()` wrapper in Tailwind
- All sizes use **rem** (1rem = 10px)

---

## Environment Variables (TBD)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
```

Never commit `.env.local`
