"use client";

import * as React from "react";
import { Container } from "@/components/layout";
import { StyledBreadcrumb } from "@/components/styled";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bell,
  Shield,
  Lock,
  Globe,
  Palette,
  CreditCard,
  Trash2,
  KeyRound,
} from "lucide-react";
import { useToggle2fa } from "@/queries/mutation";
import { useGetSetting } from "@/queries/query";

export default function SettingsPage() {
  const { data: setting } = useGetSetting();
  const { mutate: toggle2fa, isPending } = useToggle2fa();
  const [showDisable2faDialog, setShowDisable2faDialog] = React.useState(false);

  return (
    <>
      <StyledBreadcrumb route="Settings" />
      <div className="min-h-screen">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <>
            {/* Security Settings */}
            <Card className="border-none shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center gap-2">
                  <Shield size={20} />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-0">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>

                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>

                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>

                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button>
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 font-semibold ">
                    <KeyRound size={20} />
                    Two-Factor Authentication
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">OTP Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Receive OTP codes via Email
                        </p>
                      </div>
                      <>
                        <Switch
                          checked={Boolean(setting?.twoFactorEnabled)}
                          disabled={isPending}
                          onCheckedChange={() => {
                            if (setting?.twoFactorEnabled) {
                              setShowDisable2faDialog(true);
                              return;
                            }
                            toggle2fa();
                          }}
                        />
                        <Dialog
                          open={showDisable2faDialog}
                          onOpenChange={setShowDisable2faDialog}
                        >
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Turn off 2FA?</DialogTitle>
                              <DialogDescription>
                                Disabling two-factor authentication reduces your
                                account security. You can re-enable it anytime
                                in Settings.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-3 pt-4">
                              <DialogClose asChild>
                                <Button
                                  variant="outline"
                                  onClick={() => setShowDisable2faDialog(false)}
                                >
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  setShowDisable2faDialog(false);
                                  toggle2fa();
                                }}
                              >
                                Turn off
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Authenticator App</p>
                        <p className="text-sm text-muted-foreground">
                          Use apps like Google Authenticator
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Notification Settings */}
            <Card className="border-none shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Choose which notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-0">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about your order status
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotional Emails</p>
                        <p className="text-sm text-muted-foreground">
                          Receive offers and discounts
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-muted-foreground">
                          Weekly updates and news
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Push Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Real-time order notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Price Drops</p>
                        <p className="text-sm text-muted-foreground">
                          When items in your wishlist go on sale
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Privacy Settings */}
            <Card className="border-none shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control how your information is shared
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-muted-foreground">
                      Make your profile public or private
                    </p>
                  </div>
                  <Select defaultValue="public">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Sharing</p>
                    <p className="text-sm text-muted-foreground">
                      Allow data to be used for improvements
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics</p>
                    <p className="text-sm text-muted-foreground">
                      Help improve our services
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Appearance Settings */}
            <Card className="border-none shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize how the app looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-0">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="gmt">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Billing Settings */}
            <Card className="border-none shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing Settings
                </CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-0">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Subscription</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Current Plan</p>
                        <p className="text-sm text-muted-foreground">
                          Free Plan
                        </p>
                      </div>
                      <Badge variant="secondary">Free</Badge>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline">Upgrade Plan</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Payment Methods
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/25
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Danger Zone */}
            <Card className="border-none shadow-none">
              <CardContent className="space-y-4 px-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove all your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-3 pt-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </>
        </Container>
      </div>
    </>
  );
}
