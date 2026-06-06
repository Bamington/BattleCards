/**
 * PacksPlaceholder.tsx — temporary placeholder for /app/packs and /app/packs/new
 *
 * Two routes resolve to this page until the real flows are built:
 *   - /app/packs       → "Manage your packs" lands here (mode = 'manage')
 *   - /app/packs/new   → "Create Pack" lands here     (mode = 'create')
 *
 * Replace this with the actual pages once the Figma + data model for
 * each is settled. The PackRoute prop drives which mode is shown.
 */

import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Box from '../icons/Box';
import AltArrowLeft from '../icons/AltArrowLeft';

interface Props {
  mode: 'manage' | 'create';
}

const COPY: Record<Props['mode'], { title: string; body: string }> = {
  manage: {
    title: 'Manage your packs',
    body:
      "We're still building this view. It will let you see and edit packs " +
      "you've created or imported.",
  },
  create: {
    title: 'Create a pack',
    body:
      "We're still building this flow. It will let you bundle your " +
      'templates, addons, and keywords into a pack to share with others.',
  },
};

export default function PacksPlaceholder({ mode }: Props) {
  const navigate = useNavigate();
  const { title, body } = COPY[mode];

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">

      <Navbar fixed={false} />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full flex flex-col items-center gap-4 text-center">

          <Box className="size-12 text-blue-400" />

          <h1 className="font-heading text-2xl text-white">{title}</h1>

          <p className="font-body text-base text-gray-300">{body}</p>

          <p className="font-body text-sm text-gray-500">Coming soon.</p>

          <Button
            variant="outline"
            color="secondary"
            leftIcon={<AltArrowLeft className="size-4" />}
            onClick={() => navigate('/app')}
            className="mt-2"
          >
            Back to home
          </Button>

        </div>
      </div>

    </div>
  );
}
