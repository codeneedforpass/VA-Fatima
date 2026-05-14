import {publicAssetUrl} from '../lib/publicAsset';

export type WorkImage = {title: string; parts: string[]};
export type WorkVideo = {title: string; parts: string[]; kind: 'mp4' | 'mov'};

export const eaSamples: WorkImage[] = [
  {title: 'Building email list (1)', parts: ['work', 'ea-samples', '01 Administrative-EA Samples', 'Building Email List 1.jpg']},
  {title: 'Building email list (2)', parts: ['work', 'ea-samples', '01 Administrative-EA Samples', 'Building Email List 2.jpg']},
  {title: 'Client follow-ups', parts: ['work', 'ea-samples', '01 Administrative-EA Samples', 'Client Follow-Ups.jpg']},
  {title: 'Coordinating schedules', parts: ['work', 'ea-samples', '01 Administrative-EA Samples', 'Coordinating Schedules.JPG']},
  {title: 'Scheduling appointments', parts: ['work', 'ea-samples', '01 Administrative-EA Samples', 'Scheduling Appointments.JPG']},
  {title: 'VA onboarding', parts: ['work', 'ea-samples', '01 Administrative-EA Samples', 'VA Onboarding.jpg']},
];

export const socialSamples: WorkImage[] = [
  {
    title: 'Carousel 1 of 2 — relationships & clients',
    parts: [
      'work',
      'social-media',
      '02 Social Media Samples',
      'Carousel 1of2 - This is not another story about building relationships to get clients.png',
    ],
  },
  {
    title: 'Carousel 2 of 2 — relationships & clients',
    parts: [
      'work',
      'social-media',
      '02 Social Media Samples',
      'Carousel 2of2 - This is not another story about building relationships to get clients.png',
    ],
  },
  {title: 'MC 1', parts: ['work', 'social-media', '02 Social Media Samples', 'MC 1.png']},
  {title: 'MC 2', parts: ['work', 'social-media', '02 Social Media Samples', 'MC 2.png']},
  {title: 'MC 3', parts: ['work', 'social-media', '02 Social Media Samples', 'MC 3.png']},
  {title: 'MT 1', parts: ['work', 'social-media', '02 Social Media Samples', 'MT1.jpg']},
  {title: 'MT 2', parts: ['work', 'social-media', '02 Social Media Samples', 'MT 2.jpg']},
  {title: 'MT 3', parts: ['work', 'social-media', '02 Social Media Samples', 'MT 3.jpg']},
  {title: 'MT 4', parts: ['work', 'social-media', '02 Social Media Samples', 'MT 4.jpg']},
  {title: 'MT 5', parts: ['work', 'social-media', '02 Social Media Samples', 'MT 5.jpg']},
  {title: 'Sample 1', parts: ['work', 'social-media', '02 Social Media Samples', 'sample 1.png']},
  {title: 'Sample 2', parts: ['work', 'social-media', '02 Social Media Samples', 'sample 2.png']},
  {title: 'Sample 3', parts: ['work', 'social-media', '02 Social Media Samples', 'sample 3.png']},
  {title: 'Sample 4', parts: ['work', 'social-media', '02 Social Media Samples', 'sample 4.png']},
  {title: 'Sample 5', parts: ['work', 'social-media', '02 Social Media Samples', 'sample 5.png']},
  {
    title: 'TUM Episode 36 — following your passion',
    parts: ['work', 'social-media', '02 Social Media Samples', 'TUM Episode 36 Alison On Following your Passion.png'],
  },
  {title: 'YLF 1', parts: ['work', 'social-media', '02 Social Media Samples', 'YLF 1.jpg']},
  {title: 'YLF 2', parts: ['work', 'social-media', '02 Social Media Samples', 'YLF 2.jpg']},
  {title: 'YLF 3', parts: ['work', 'social-media', '02 Social Media Samples', 'YLF 3.jpg']},
  {title: 'YLF 4', parts: ['work', 'social-media', '02 Social Media Samples', 'YLF 4.jpg']},
  {title: 'YLF 5', parts: ['work', 'social-media', '02 Social Media Samples', 'YLF 5.jpg']},
];

export const videoSamples: WorkVideo[] = [
  {
    title: 'YouTube — animated captions',
    parts: ['work', 'video-editing', '03 Light Audio-Video Editing', 'Youtube video with animated captions.mp4'],
    kind: 'mp4',
  },
  {
    title: 'Condo tour — short video',
    parts: ['work', 'video-editing', '03 Light Audio-Video Editing', 'Condo Tour Short Video.mov'],
    kind: 'mov',
  },
  {
    title: 'Tostitos school ads',
    parts: ['work', 'video-editing', '03 Light Audio-Video Editing', 'Tostitos School Ads.mov'],
    kind: 'mov',
  },
];

export const projectManagementShot = publicAssetUrl([
  'work',
  'project-management',
  'asana-bhub-list.png',
]);

/** Home marquee: EA + social thumbnails linking to `/work` sections (images only). */
export function getMarqueeWorkStrip() {
  const ea = eaSamples.map((w) => ({...w, workHash: '#ea' as const}));
  const social = socialSamples.slice(0, 12).map((w) => ({...w, workHash: '#social' as const}));
  return [...ea, ...social];
}

export const customerServicePdf = publicAssetUrl(['work', 'customer-service.pdf']);
export const sopTransferwisePdf = publicAssetUrl(['work', 'sop-transferwise-va.pdf']);

export const workNav = [
  {id: 'ea', label: 'Admin / EA'},
  {id: 'social', label: 'Social'},
  {id: 'video', label: 'Video'},
  {id: 'pm', label: 'Project mgmt'},
  {id: 'sop', label: 'SOP'},
  {id: 'support', label: 'CX'},
] as const;
