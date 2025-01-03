import { DashboardHeader } from "@/components/header/DashboardHeader";
import { InviteUsers } from "@/components/inviteUsers/InviteUsers";
import { WorkspaceTab } from "@/components/settings/workspace/WorkspaceTab";
import { getWorkspaceSettings } from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";


interface Params {
    params: {
        workspace_id: string;
    }
}

const WorkSpace = async ({ params: { workspace_id } }: Params) => {
    const session = await checkIfUserCompletedOnboarding(
        `/dashboard/settings/workspace/${workspace_id}`
    );
    const workspace = await getWorkspaceSettings(workspace_id, session.user.id);

    const user = workspace.subscribers.find(
        (subscriber) => subscriber.user.id === session.user.id
    );
    return (
        <>
            <DashboardHeader
                className="mb-2 sm:mb-0"
                addManualRoutes={[
                    {
                        name: "DASHBOARD",
                        href: "/dashboard",
                        useTranslate: true,
                    },
                    {
                        name: "settings",
                        href: "/dashboard/settings",
                    },
                    {
                        name: workspace.name,
                        href: "/",
                    },
                ]}
            >
                {(user?.userRole === "ADMIN" || user?.userRole === "OWNER") && (
                    <InviteUsers workspace={workspace} />
                )}
            </DashboardHeader>
            <main className="flex flex-col gap-2">
                <WorkspaceTab workspace={workspace} workspaceId={workspace.id} />
            </main>
        </>
    )
}

export default WorkSpace