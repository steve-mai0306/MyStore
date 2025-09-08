"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import VendorSidebarLayout from "@/app/(vendor)/layout/SidebarLayout";
import { VendorWrapper } from "@/app/(vendor)/_components";
import { Trash, UserPlus, HelpCircle } from "lucide-react";

type Member = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const owner: Member = {
  id: 0,
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Owner",
};

const initialMembers: Member[] = [
  { id: 1, name: "Jane Smith", email: "jane.smith@example.com", role: "Staff" },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Staff",
  },
];

const STAFF_LIMIT = 10;

export default function VendorTeamSettingsPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <VendorSidebarLayout
      breadcrumb={[
        { label: "Dashboard", href: "/vendor" },
        { label: "Team Settings" },
      ]}
    >
      <VendorWrapper>
        <>
          <h1 className="text-3xl font-bold my-5">Manage Team Members</h1>

          {/* Owner Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Store Owner</h2>
            <p className="text-sm text-muted-foreground">
              Account owner the shop administrator
            </p>
          </div>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center justify-center rounded-full bg-muted w-12 h-12 text-lg font-bold">
              {owner.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <div className="font-medium">{owner.name}</div>
              <div className="text-sm text-muted-foreground">{owner.email}</div>
            </div>
          </div>

          <Separator />

          {/* Staff List Section */}
          <Card>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <div className="text-sm text-muted-foreground">
                  Created {members.length}/{STAFF_LIMIT} staff accounts
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="default">
                    <UserPlus className="mr-1 h-4 w-4" />
                    Add Staff
                  </Button>
                  <Button size="sm" variant="outline">
                    Buy More
                  </Button>
                </div>
              </div>
              <div className="mb-3">
                <Input
                  placeholder="Search staff"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-xs w-full"
                />
              </div>
              <div className="rounded-lg border overflow-x-auto">
                <div className="grid grid-cols-3 font-semibold px-4 py-2 bg-muted text-sm min-w-[50rem]">
                  <div>Staff</div>
                  <div>Access Rights</div>
                </div>
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="grid grid-cols-3 items-center px-4 py-2 border-t min-w-[50rem]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-full bg-primary text-primary-foreground w-8 h-8 text-sm font-bold">
                        {member.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {member.email}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      Full access
                      <br />
                      <span className="text-xs text-muted-foreground">
                        (except app install, create staff)
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(member.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground my-3">You can log out the employees from your store&#39;s website.</p>
              <>
                <Button variant="outline" size="sm">
                  End all login sessions
                </Button>
              </>
            </CardContent>
          </Card>

          <Separator />

          {/* Change Owner Section */}
          <Card>
            <CardHeader>
              <CardTitle>Change Store Owner Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                You can transfer store ownership to another admin staff. If you
                do this, they will have full control of the store (including
                payment access). Your account will be changed to a regular staff
                account.
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                <Select value={newOwnerEmail} onValueChange={setNewOwnerEmail}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Select email for new owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((m) => (
                      <SelectItem key={m.id} value={m.email}>
                        {m.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  disabled={!newOwnerEmail}
                  className="w-full sm:w-auto"
                >
                  Set as Owner
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Button */}
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <HelpCircle className="h-4 w-4" />
              Help about Staff List
            </Button>
          </div>
        </>
      </VendorWrapper>
    </VendorSidebarLayout>
  );
}
