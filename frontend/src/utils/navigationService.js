import { CommonActions } from '@react-navigation/native';

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (name, params) => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      })
    );
  }
};
