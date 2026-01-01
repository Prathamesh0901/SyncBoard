import { redirect } from "next/navigation";
import { verifyToken } from "../../../lib/utils/fetch";

export default async function InvitePage({ params }: {
    params: { inviteToken: string };
}) {
    const { inviteToken } = (await params);

    if (!inviteToken) {
        return <div>Invalid invite token</div>;
    }

    const data = await verifyToken(inviteToken);

    if (!data || !data.valid) {
        return (
            <div className="p-6">
                Invite link invalid or expired.
            </div>
        );
    }

    redirect(`/canvas/${data.slug}?invite=${inviteToken}`);
}
