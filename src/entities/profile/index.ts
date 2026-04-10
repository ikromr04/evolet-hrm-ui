export {
  profileStoreSchema,
  type ProfileStoreSchema,
} from './model/schemas';

export {
  storeProfileAction,
} from './model/thunks';

export type {
  Profile,
  Profiles,
} from './model/types';

export { profileSlice } from './model/slice';

export {
  getProfilesStatus,
  getProfiles,
} from './model/selectors';
