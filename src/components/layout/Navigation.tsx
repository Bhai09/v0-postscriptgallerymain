import { Link, useLocation } from "react-router-dom";
import { Home, Compass, MessageCircle, PlusSquare, User, Instagram, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { signOut } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Logged out", description: "See you soon!" });
      navigate("/auth");
    }
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: PlusSquare, label: "Create", path: "/create" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card flex flex-col p-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
          <Instagram className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold gradient-text">SocialHub</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 text-base"
            >
              <item.icon className={isActive(item.path) ? "text-primary" : ""} />
              <span className={isActive(item.path) ? "font-semibold" : ""}>{item.label}</span>
            </Button>
          </Link>
        ))}

        {profile && (
          <Link to={`/profile/${profile.username}`}>
            <Button
              variant={location.pathname.startsWith("/profile") ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 text-base"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback>{profile.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className={location.pathname.startsWith("/profile") ? "font-semibold" : ""}>
                Profile
              </span>
            </Button>
          </Link>
        )}
      </nav>

      {/* Logout */}
      <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3">
        <LogOut />
        Logout
      </Button>
    </aside>
  );
};

export default Navigation;
