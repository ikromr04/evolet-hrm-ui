export {
  profileStoreSchema,
  type ProfileStoreSchema,
} from './model/schemas';

export {
  fetchProfilesAction,
  storeProfileAction,
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
