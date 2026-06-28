import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
  X,
  Clock,
  TrendingUp,
  Mail,
} from "lucide-react";
import {
  Avatar,
  IconButton,
  Dropdown,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "../ui";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";

/* Centered text links — a subset of the primary nav, rendered in a white pill
   exactly like the reference top bar. */
const LINKS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/leads", label: "Leads" },
  { to: "/pipeline", label: "Pipeline" },
  { to: "/contacts", label: "Contacts" },
  { to: "/tasks", label: "Follow-ups" },
];

const SEARCH_TARGETS = [
  { label: "Dashboard", path: "/", keywords: "overview analytics revenue" },
  { label: "Leads", path: "/leads", keywords: "deals prospects customers" },
  { label: "Pipeline", path: "/pipeline", keywords: "kanban stages sales" },
  { label: "Contacts", path: "/contacts", keywords: "people clients email" },
  { label: "Notes", path: "/notes", keywords: "memo pinned activity" },
  { label: "Follow-ups", path: "/tasks", keywords: "tasks reminders schedule" },
  { label: "Settings", path: "/settings", keywords: "profile account ai" },
];

const NOTIFICATIONS = [
  {
    icon: Clock,
    title: "3 follow-ups due today",
    body: "Review your task list before the day closes.",
    path: "/tasks",
  },
  {
    icon: TrendingUp,
    title: "Pipeline moved up 12.8%",
    body: "Closed-won value improved this week.",
    path: "/pipeline",
  },
  {
    icon: Mail,
    title: "AI email draft ready",
    body: "Generate a follow-up from any lead drawer.",
    path: "/leads",
  },
];

export function TopNav({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);

  const matches = SEARCH_TARGETS.filter((item) => {
    const text = `${item.label} ${item.keywords}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  }).slice(0, 5);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const goToResult = (path) => {
    navigate(path);
    closeSearch();
  };

  const submitSearch = (event) => {
    event.preventDefault();
    if (matches[0]) goToResult(matches[0].path);
  };

  return (
    <header className="flex items-center gap-3">
      {/* Brand */}
      <div className="flex items-center gap-2.5 pr-2">
        <div className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="hidden font-display text-lg font-bold text-ink sm:block">
          DealFlow AI CRM
        </span>
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-ink-soft hover:bg-surface-muted lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Centered nav pill */}
      <nav className="mx-auto hidden items-center gap-1 rounded-full bg-surface p-1.5 shadow-[var(--shadow-soft)] lg:flex">
        {LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "rounded-full px-5 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-surface-muted text-ink shadow-sm"
                  : "text-ink-soft hover:text-ink"
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden sm:block">
          {searchOpen ? (
            <form onSubmit={submitSearch} className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") closeSearch();
                }}
                placeholder="Search pages..."
                className="h-10 w-64 rounded-full border border-line bg-surface pl-9 pr-10 text-sm text-ink shadow-[var(--shadow-soft)] outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-soft hover:bg-surface-muted hover:text-ink"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>

              {(query || searchOpen) && (
                <div className="absolute right-0 z-40 mt-2 w-72 rounded-2xl border border-line bg-surface p-1.5 shadow-[var(--shadow-pop)] animate-fade-up">
                  {matches.length > 0 ? (
                    matches.map((item) => (
                      <button
                        key={item.path}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => goToResult(item.path)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-ink transition hover:bg-surface-muted"
                      >
                        <span>{item.label}</span>
                        <span className="text-xs text-ink-soft">{item.path}</span>
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-3 text-sm text-ink-soft">No matching pages.</p>
                  )}
                </div>
              )}
            </form>
          ) : (
            <IconButton aria-label="Search" onClick={openSearch}>
              <Search className="h-[18px] w-[18px]" />
            </IconButton>
          )}
        </div>

        <Dropdown
          className="w-80 p-2"
          trigger={
            <IconButton aria-label="Notifications" className="relative">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-surface" />
            </IconButton>
          }
        >
          <div className="px-2 pb-2 pt-1">
            <p className="text-sm font-semibold text-ink">Notifications</p>
            <p className="text-xs text-ink-soft">Latest CRM activity</p>
          </div>
          <DropdownSeparator />
          <div className="space-y-1">
            {NOTIFICATIONS.map(({ icon: Icon, title, body, path }) => (
              <button
                key={title}
                onClick={() => navigate(path)}
                className="flex w-full gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-surface-muted"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">{title}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">{body}</span>
                </span>
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          trigger={
            <button className="flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-2.5 transition hover:bg-surface-muted">
              <Avatar name={user?.name} src={user?.avatar} size="sm" />
              <ChevronDown className="h-4 w-4 text-ink-soft" />
            </button>
          }
        >
          <DropdownLabel>{user?.email}</DropdownLabel>
          <DropdownSeparator />
          <DropdownItem onClick={() => navigate("/settings")}>
            <User className="h-4 w-4" /> Profile & settings
          </DropdownItem>
          <DropdownItem danger onClick={logout}>
            <LogOut className="h-4 w-4" /> Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
