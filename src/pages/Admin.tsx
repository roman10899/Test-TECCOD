import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/entities/service";
import { getServices, addService as addServiceApi, deleteService as deleteServiceApi } from "@/entities/service/api";
import { ServiceIcon } from "@/shared/ui/ServiceIcon";

const AVAILABLE_ICONS = [
  "Armchair",
  "Users",
  "Coffee",
  "UtensilsCrossed",
  "Wifi",
  "Briefcase",
] as const;

const Admin = () => {
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: "",
    icon: "Armchair" as string,
  });
  const [loading, setLoading] = useState(false);

  const handleAddService = () => {
    if (!newService.title || !newService.price) return;
    const payload = {
      title: newService.title,
      description: newService.description,
      price: parseFloat(newService.price),
      icon: newService.icon,
    };

    setLoading(true);
    addServiceApi(payload)
      .then((created) => {
        if (created) setServicesList((s) => [...s, created]);
      })
      .finally(() => {
        setLoading(false);
        setNewService({ title: "", description: "", price: "", icon: "Armchair" });
      });
  };

  const handleDeleteService = (id: string) => {
    // optimistic UI
    setServicesList((s) => s.filter((x) => x.id !== id));
    deleteServiceApi(id).then((ok) => {
      if (!ok) {
        // rollback: refetch from remote
        getServices().then((remote) => setServicesList(remote.length ? remote : []));
      }
    });
  };

  // load services from Supabase on mount
  useEffect(() => {
    setLoading(true);
    getServices()
      .then((remote) => {
        if (remote && remote.length) setServicesList(remote);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Manage services</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Add New Service Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                placeholder="Service title"
                value={newService.title}
                onChange={(e) =>
                  setNewService({ ...newService, title: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price ($)"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
              />
            </div>
            <Textarea
              placeholder="Description"
              value={newService.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
            />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Select icon:</p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_ICONS.map((icon) => (
                  <Button
                    key={icon}
                    type="button"
                    variant={newService.icon === icon ? "default" : "outline"}
                    size="icon"
                    onClick={() => setNewService({ ...newService, icon })}
                  >
                    <ServiceIcon name={icon} className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={handleAddService} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </CardContent>
        </Card>

        {/* Services List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Services ({servicesList.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {servicesList.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ServiceIcon name={service.icon} className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{service.title}</p>
                      <p className="text-sm text-muted-foreground">${service.price}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
