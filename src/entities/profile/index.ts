export {
  profileStoreSchema,
  type ProfileStoreSchema,
  profileUpdateSchema,
  type ProfileUpdateSchema,
} from './model/schemas';

export {
  fetchProfilesAction,
  storeProfileAction,
  updateProfileAction,
} from './model/thunks';

export {
  Sex,
  FamilyStatus,
  type Profile,
  type Profiles,
} from './model/types';

export { profileSlice } from './model/slice';

export {
  getProfilesStatus,
  getProfiles,
} from './model/selectors';
