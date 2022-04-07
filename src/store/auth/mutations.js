export function signIn(state, data) {
  state.signedIn = true;
  state.token = data;
}

export function signOut(state) {
  state.signedIn = false;
  state.token = false;
}

export function updateProfile(state, profile) {
  state.profile = profile;
}
