/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppSidebar } from '@/views/components/app-sidebar';
import { Header } from '@/views/components/header';
import { Button } from '@/views/components/ui/button';
import { Card, CardContent } from '@/views/components/ui/card';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/views/components/ui/sidebar';
import { useState } from 'react';

import { Badge } from '@/views/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/views/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu';
import { Input } from '@/views/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/views/components/ui/sheet';

// Ícones do Phosphor
import {
  DotsThree,
  Eye,
  EyeSlash,
  Flag,
  Heart,
  ShareNetwork,
  Trash,
  Warning,
} from '@phosphor-icons/react';

export function CommunityPage() {
  const [open, setOpen] = useState(false);
  const [moderationDialog, setModerationDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [removalReason, setRemovalReason] = useState({
    warning: false,
    retainPoints: false,
    removePoints: false,
    general: false,
    spam: false,
    supportChannel: false,
    nonsense: false,
    offTopic: false,
    personalData: false,
    inappropriateLanguage: false,
  });

  const [posts, setPosts] = useState([
    {
      id: 'p1',
      user: 'euguilhermelima',
      time: '2h atrás',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=60',
      text: 'Salvando vidas! Primeira doação do ano. #doarsalvavidas',
      likes: 12,
      shares: 2,
      liked: false,
      shared: false,
      visible: true,
    },
    {
      id: 'p2',
      user: 'eduardomarcos',
      time: '7 dias atrás',
      img: 'https://images.unsplash.com/photo-1584467735876-6d5a3b3804a6?w=800&q=60',
      text: 'A solidariedade corre nas veias. Seja o motivo da esperança de alguém.',
      likes: 1400,
      shares: 4,
      liked: false,
      shared: false,
      visible: true,
    },
    {
      id: 'p3',
      user: 'brunocarmedi',
      time: '2 dias atrás',
      img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=60',
      text: 'Compartilhe vida, compartilhe esperança. Doe sangue, doe amor.',
      likes: 24,
      shares: 3,
      liked: false,
      shared: false,
      visible: true,
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          };
        }
        return post;
      }),
    );
  };

  const handleShare = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            shares: post.shared ? post.shares - 1 : post.shares + 1,
            shared: !post.shared,
          };
        }
        return post;
      }),
    );
  };

  const openModerationDialog = (post: any) => {
    setSelectedPost(post);
    setModerationDialog(true);
    // Resetar razões de remoção
    setRemovalReason({
      warning: false,
      retainPoints: false,
      removePoints: false,
      general: false,
      spam: false,
      supportChannel: false,
      nonsense: false,
      offTopic: false,
      personalData: false,
      inappropriateLanguage: false,
    });
  };

  const handleRemovePost = () => {
    if (selectedPost) {
      setPosts(
        posts.map((post) =>
          post.id === selectedPost.id ? { ...post, visible: false } : post,
        ),
      );
      setModerationDialog(false);
    }
  };

  const handleToggleVisibility = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, visible: !post.visible } : post,
      ),
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4 w-full">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
            </div>
            <Header />
          </div>
        </header>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-medium">Comunidade</h2>
              <Badge variant="secondary" className="text-sm">
                {posts.filter((post) => post.visible).length} posts
              </Badge>
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="default">Publicar</Button>
              </SheetTrigger>

              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Novo post na comunidade</SheetTitle>
                  <SheetDescription>
                    Crie um post com imagem e legenda.
                  </SheetDescription>
                </SheetHeader>

                <div className="p-4 flex flex-col gap-3">
                  <label className="text-sm font-medium">
                    Imagem (opcional)
                  </label>
                  <Input type="file" />

                  <label className="text-sm font-medium">Legenda</label>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border p-2 border-input bg-background"
                    placeholder="Compartilhe sua mensagem com a comunidade..."
                  />
                </div>

                <SheetFooter>
                  <div className="flex justify-end gap-2 w-full">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => setOpen(false)}>Publicar</Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className={`rounded-2xl overflow-hidden transition-all duration-200 ${
                  !post.visible ? 'opacity-60 bg-muted/50' : ''
                }`}>
                <div className="relative">
                  <img
                    src={post.img}
                    alt={post.user}
                    className="w-full h-56 object-cover"
                  />
                  {!post.visible && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1">
                        <EyeSlash size={14} />
                        Oculto
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm">{post.user}</h3>
                        {!post.visible && (
                          <EyeSlash
                            size={14}
                            className="text-muted-foreground"
                          />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {post.time}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0">
                          <DotsThree size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleToggleVisibility(post.id)}
                          className="flex items-center gap-2">
                          {post.visible ? (
                            <EyeSlash size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                          {post.visible ? 'Ocultar post' : 'Mostrar post'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openModerationDialog(post)}
                          className="flex items-center gap-2 text-destructive">
                          <Warning size={16} />
                          Moderar post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-sm text-foreground mb-4">{post.text}</p>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-2 h-8 px-2 ${
                          post.liked ? 'text-red-500' : 'text-muted-foreground'
                        }`}
                        onClick={() => handleLike(post.id)}>
                        <Heart
                          weight={post.liked ? 'fill' : 'regular'}
                          size={18}
                        />
                        <span className="text-xs">
                          {formatNumber(post.likes)}
                        </span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-2 h-8 px-2 ${
                          post.shared
                            ? 'text-blue-500'
                            : 'text-muted-foreground'
                        }`}
                        onClick={() => handleShare(post.id)}>
                        <ShareNetwork
                          weight={post.shared ? 'fill' : 'regular'}
                          size={18}
                        />
                        <span className="text-xs">
                          {formatNumber(post.shares)}
                        </span>
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground"
                      onClick={() => openModerationDialog(post)}>
                      <Flag size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dialog de Moderação */}
        <Dialog open={moderationDialog} onOpenChange={setModerationDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Warning className="text-destructive" size={20} />
                Moderar Post
              </DialogTitle>
              <DialogDescription>
                Selecione o motivo da remoção do post de {selectedPost?.user}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Motivo da remoção</h4>

                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.general}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          general: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Geral</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.spam}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          spam: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Spam</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.supportChannel}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          supportChannel: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Canal de Suporte</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.nonsense}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          nonsense: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Sem sentido</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.offTopic}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          offTopic: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Fora do tópico</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.personalData}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          personalData: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Dados pessoais</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.inappropriateLanguage}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          inappropriateLanguage: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Linguagem inapropriada</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h4 className="text-sm font-medium">Ações adicionais</h4>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.warning}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          warning: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Aviso de problema</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.retainPoints}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          retainPoints: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Reter pontos</span>
                  </label>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={removalReason.removePoints}
                      onChange={(e) =>
                        setRemovalReason({
                          ...removalReason,
                          removePoints: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Remover pontos concedidos</span>
                  </label>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-2 sm:justify-between">
              <Button
                variant="outline"
                onClick={() => setModerationDialog(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleRemovePost}
                className="flex items-center gap-2">
                <Trash size={16} />
                Remover post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default CommunityPage;
