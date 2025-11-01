import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface PostCardProps {
  post: any;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);

  const handleLike = async () => {
    if (!user) return;

    if (isLiked) {
      // Unlike
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", user.id);
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      // Like
      await supabase
        .from("post_likes")
        .insert({ post_id: post.id, user_id: user.id });
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const renderMedia = () => {
    if (!post.media_urls || post.media_urls.length === 0) return null;

    switch (post.post_type) {
      case "image":
      case "meme":
        return (
          <img
            src={post.media_urls[0]}
            alt="Post content"
            className="w-full h-auto max-h-[600px] object-cover rounded-lg"
          />
        );
      case "video":
        return (
          <video
            src={post.media_urls[0]}
            controls
            className="w-full h-auto max-h-[600px] rounded-lg"
          />
        );
      case "carousel":
        return (
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {post.media_urls.map((url: string, idx: number) => (
              <img
                key={idx}
                src={url}
                alt={`Slide ${idx + 1}`}
                className="h-96 w-auto rounded-lg"
              />
            ))}
          </div>
        );
      case "audio":
        return (
          <audio src={post.media_urls[0]} controls className="w-full" />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (post.post_type) {
      case "code":
        return (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{post.caption}</code>
          </pre>
        );
      case "poll":
        return (
          <div className="space-y-2">
            {post.poll_options?.options?.map((option: string, idx: number) => (
              <Button key={idx} variant="outline" className="w-full justify-start">
                {option}
              </Button>
            ))}
          </div>
        );
      default:
        return post.caption && (
          <p className="text-foreground whitespace-pre-wrap">{post.caption}</p>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6 overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <Link
            to={`/profile/${post.profiles?.username}`}
            className="flex items-center gap-3"
          >
            <Avatar>
              <AvatarImage src={post.profiles?.avatar_url || undefined} />
              <AvatarFallback>
                {post.profiles?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.profiles?.username}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </Link>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          {renderMedia()}
          
          <div className="p-4 space-y-3">
            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLike}
                  className="hover:text-red-500"
                >
                  <Heart className={isLiked ? "fill-red-500 text-red-500" : ""} />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark />
              </Button>
            </div>

            {/* Likes count */}
            {likesCount > 0 && (
              <p className="text-sm font-semibold">{likesCount} likes</p>
            )}

            {/* Content */}
            {renderContent()}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Difficulty */}
            {post.difficulty && (
              <Badge
                variant={
                  post.difficulty === "easy"
                    ? "default"
                    : post.difficulty === "medium"
                    ? "secondary"
                    : "destructive"
                }
              >
                {post.difficulty}
              </Badge>
            )}

            {/* Comments preview */}
            {post.comments_count > 0 && (
              <button className="text-sm text-muted-foreground hover:text-foreground">
                View all {post.comments_count} comments
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostCard;
