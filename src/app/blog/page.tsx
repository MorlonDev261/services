"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Plus, FolderPlus, Save } from "lucide-react";

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
}

interface Folder {
  id: string;
  name: string;
  services: Service[];
}

interface NewService {
  title: string;
  description: string;
}

export default function ServiceManager() {
  const [folder, setFolder] = useState<Folder | null>(null);
  const [folderName, setFolderName] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<NewService>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Simulate fetching folder data from an API
  const fetchFolder = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const folderData: Folder = {
        id,
        name: `Folder ${id}`,
        services: [
          {
            id: "1",
            title: "Web Service",
            description: "Modern website development",
          },
          {
            id: "2",
            title: "Mobile Service",
            description: "iOS and Android mobile apps",
          },
        ],
      };

      setFolder(folderData);
      setServices(folderData.services);
      setMessage("Folder successfully fetched!");
    } catch {
      setMessage("Error while fetching folder");
    }
    setLoading(false);
  };

  // Create a new folder
  const createFolder = async (): Promise<void> => {
    if (!folderName.trim()) {
      setMessage("Please enter a folder name");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newId = Math.random().toString(36).substring(2, 11);
      const newFolder: Folder = {
        id: newId,
        name: folderName,
        services: [],
      };

      setFolder(newFolder);
      setServices([]);
      setFolderName("");
      setMessage(`Folder "${newFolder.name}" created successfully! ID: ${newId}`);

      // Example if you want to persist it
      // localStorage.setItem("folderId", newId);
    } catch {
      setMessage("Error while creating folder");
    }
    setLoading(false);
  };

  // Add a new service
  const addService = (): void => {
    if (!newService.title.trim() || !newService.description.trim()) {
      setMessage("Please fill in all service fields");
      return;
    }

    const service: Service = {
      id: Math.random().toString(36).substring(2, 11),
      title: newService.title,
      description: newService.description,
    };

    setServices((prev) => [...prev, service]);
    setNewService({ title: "", description: "" });
    setMessage("Service successfully added!");
  };

  // Delete a service
  const deleteService = (id: string): void => {
    setServices((prev) => prev.filter((service) => service.id !== id));
    setMessage("Service deleted");
  };

  // Save all services
  const saveServices = async (): Promise<void> => {
    if (!folder) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Services successfully saved!");
    } catch {
      setMessage("Error while saving services");
    }
    setLoading(false);
  };

  // Example: Fetch folder from localStorage on load
  useEffect(() => {
    // const savedId = localStorage.getItem("folderId");
    // if (savedId) {
    //   fetchFolder(savedId);
    // }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Service Manager By Morlon
          </h1>
          <p className="text-gray-600">
            Create and manage your service folders easily
          </p>
        </div>

        {/* Messages */}
        {message && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription className="text-blue-800">{message}</AlertDescription>
          </Alert>
        )}

        {/* Folder creation */}
        {!folder && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5" />
                Create a new folder
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Folder name
                  </label>
                  <Input
                    type="text"
                    value={folderName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value)}
                    placeholder="Enter folder name..."
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={createFolder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {loading ? "Creating..." : "Create folder"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Folder details */}
        {folder && (
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span>📁 {folder.name}</span>
                  <span className="text-sm opacity-80">ID: {folder.id}</span>
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Add new service */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add a service
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service title
                    </label>
                    <Input
                      type="text"
                      value={newService.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewService((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Service title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={newService.description}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setNewService((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Detailed service description..."
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={addService}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Add service
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Services list */}
            {services.length > 0 && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <span>Services ({services.length})</span>
                    <Button
                      onClick={saveServices}
                      disabled={loading}
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? "Saving..." : "Save"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {services.map((service, index) => (
                      <div
                        key={service.id}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-2">
                              {index + 1}. {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                          <Button
                            onClick={() => deleteService(service.id)}
                            variant="destructive"
                            size="sm"
                            className="ml-4"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Create new folder */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setFolder(null);
                  setServices([]);
                  setMessage("");
                }}
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Create a new folder
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
