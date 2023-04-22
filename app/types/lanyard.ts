export type DiscordStatus = LanyardData['discord_status'];

export interface LanyardWebsocket {
  loading: boolean;
  status?: LanyardData;
  websocket?: WebSocket;
}

export interface LanyardMessage {
  t: "INIT_STATE" | "PRESENCE_UPDATE";
  d: LanyardData;
}

export interface LanyardData {
  spotify?: Spotify;
  listening_to_spotify: boolean;
  discord_user: DiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  kv?: Kv;
  activities: Array<Activity>;
  active_on_discord_web: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
}

export interface Kv {
  [key: string]: string;
}

export interface Spotify {
  track_id: string;
  timestamps: Timestamps;
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface Timestamps {
  start: number;
  end: number;
}

export interface Activity {
  type: number;
  state: string;
  name: string;
  id: string;
  flags?: number;
  emoji?: Emoji;
  created_at: number;
  application_id?: string;
  timestamps?: Timestamps;
  sync_id?: string;
  session_id?: string;
  party?: Party;
  details?: string;
  buttons?: Array<string>;
  assets?: Assets;
}

export interface Party {
  id: string;
  size?: PartySize;
}

export interface PartySize {
  current_size: number;
  max_size: number;
}

export interface Assets {
  small_text: string;
  small_image: string;
  large_text: string;
  large_image: string;
}

export interface Timestamps {
  start: number;
}

export interface Emoji {
  name: string;
  id?: string;
  animated?: boolean;
}

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  bot: boolean;
  avatar: string;
}


export const READABLE_DISCORD_STATUS: {
	[S in DiscordStatus]: string;
} = {
  dnd: 'Do Not Disturb',
  idle: 'Away',
  offline: 'Offline',
  online: 'Online',
};

export const DISCORD_STATUS_COLOR: {
	[S in DiscordStatus]: string;
} = {
  dnd: 'red',
  idle: 'yellow',
  offline: 'gray',
  online: 'green',
};

export enum LanyardAvatarType {
	USER = 'user',
	MUSIC = 'music',
}
