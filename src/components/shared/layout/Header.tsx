import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { Bell, Home, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/useUIStore"

interface Notification {
  id: string
  title: string
  time: string
  read: boolean
}

const MOCK_USER = {
  name: "Admin User",
  avatar: undefined, // URL would go here
  email: "admin@minierp.com"
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "1", title: "Low stock alert: Soda Cans", time: "2 mins ago", read: false },
  { id: "2", title: "New order #12345", time: "1 hour ago", read: false },
  { id: "3", title: "System update complete", time: "1 day ago", read: true },
]

export function Header() {
  const location = useLocation()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  // Simple breadcrumb logic based on path
  const pathSegments = location.pathname.split("/").filter(Boolean)
  const currentPage = pathSegments.length > 0 
    ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)
    : "Dashboard"

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 md:px-6 shadow-sm sticky top-0 z-20">
      <div className="flex items-center justify-between w-full">
        
        {/* LEFT SIDE: Mobile Menu & Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 -ml-2 mr-1 hover:bg-slate-100 rounded-md transition-colors duration-200"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5 text-slate-600" />
            ) : (
              <Menu className="h-5 w-5 text-slate-600" />
            )}
          </button>

          <Link to="/" className="flex items-center hover:text-slate-900 transition-colors">
            <Home className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-900">{currentPage}</span>
        </div>

        {/* RIGHT SIDE: Actions */}
        <div className="flex items-center space-x-4">
          
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-slate-100 rounded-full"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="h-[18px] w-[18px] text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
              )}
            </Button>

            {/* Simple Dropdown UI for Mock Data */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-3 border-b border-slate-100 flex justify-between items-center">
                  <span className="font-semibold text-sm text-slate-900">Notifications</span>
                  <span className="text-xs text-slate-500">{unreadCount} new</span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((notification) => (
                    <div 
                      key={notification.id}
                      className={cn(
                        "p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors",
                        !notification.read && "bg-blue-50/50"
                      )}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm text-slate-900">{notification.title}</span>
                        <span className="text-xs text-slate-400 whitespace-nowrap">{notification.time}</span>
                      </div>
                      <p className="text-xs text-slate-500">You have a new update regarding this item.</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                  <Link to="/notifications" className="text-xs font-medium text-blue-600 hover:text-blue-700">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* User Profile */}
          <div className="flex items-center space-x-2 hidden md:flex cursor-pointer hover:opacity-80 transition-opacity">
            <div className="text-right">
              <div className="text-sm font-medium text-slate-900 leading-none">{MOCK_USER.name}</div>
              <div className="text-xs text-slate-500 leading-none mt-1">{MOCK_USER.email}</div>
            </div>
            <Avatar className="h-9 w-9 border border-slate-200">
              <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
              <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                {MOCK_USER.name.split(" ").map(n => n[0]).join("").slice(0,2)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}