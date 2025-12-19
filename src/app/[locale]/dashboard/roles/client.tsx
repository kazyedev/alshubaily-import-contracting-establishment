"use client";

import { useLocale } from "next-intl";
import { PageHeader } from "@/components/dashboard/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UserRole, UserPermission } from "@/server/roles";

type RoleMapping = {
    roleId: string;
    permissionId: string;
};

type RolesClientProps = {
    roles: UserRole[];
    permissions: UserPermission[];
    roleMappings: RoleMapping[];
    translations: {
        title: string;
        description: string;
        noRoles: string;
    };
};

export function RolesClient({ roles, permissions, roleMappings, translations }: RolesClientProps) {
    const locale = useLocale();

    // Group permissions by entity
    const groupedPermissions = permissions.reduce((acc, perm) => {
        const entity = perm.key.split(".")[0];
        if (!acc[entity]) {
            acc[entity] = [];
        }
        acc[entity].push(perm);
        return acc;
    }, {} as Record<string, UserPermission[]>);

    // Get permissions for a role
    const getRolePermissions = (roleId: string) => {
        const permIds = roleMappings
            .filter(m => m.roleId === roleId)
            .map(m => m.permissionId);
        return permissions.filter(p => permIds.includes(p.id));
    };

    return (
        <>
            <PageHeader
                titleEn={translations.title}
                titleAr={translations.title}
                descriptionEn={translations.description}
                descriptionAr={translations.description}
            />

            <Tabs defaultValue={roles[0]?.id} className="space-y-4">
                <TabsList>
                    {roles.map((role) => (
                        <TabsTrigger key={role.id} value={role.id}>
                            {locale === "ar" ? role.nameAr : role.nameEn}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {roles.map((role) => {
                    const rolePerms = getRolePermissions(role.id);
                    const rolePermIds = rolePerms.map(p => p.id);

                    return (
                        <TabsContent key={role.id} value={role.id}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {locale === "ar" ? role.nameAr : role.nameEn}
                                    </CardTitle>
                                    <CardDescription>
                                        {rolePerms.length} {locale === "ar" ? "صلاحية" : "permissions"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {Object.entries(groupedPermissions).map(([entity, perms]) => (
                                            <div key={entity}>
                                                <h4 className="font-semibold capitalize mb-2">{entity}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {perms.map((perm) => {
                                                        const hasPermission = rolePermIds.includes(perm.id);
                                                        return (
                                                            <Badge
                                                                key={perm.id}
                                                                variant={hasPermission ? "default" : "outline"}
                                                                className={!hasPermission ? "opacity-40" : ""}
                                                            >
                                                                {locale === "ar" ? perm.nameAr : perm.nameEn}
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    );
                })}
            </Tabs>
        </>
    );
}
