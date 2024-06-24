'use client';

import { createContext, useReducer } from 'react';

export const MULTI_FORM_DEFAULT_STATE: _MultiStepForm = {
  index: 0,
  steps: {
    0: {
      username: '',
    },
    1: {
      displayName: '',
      birthDate: '',
    },
    2: {
      bio: '',
      location: '',
    },
  },
};

export const MultiStepFormContext = createContext<_MultiStepFormContext>({
  state: MULTI_FORM_DEFAULT_STATE,
  dispatch: () => {},
});

export default function MultiStepFormContextContainer({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, MULTI_FORM_DEFAULT_STATE);

  return (
    <MultiStepFormContext.Provider value={{ state, dispatch }}>
      {children}
    </MultiStepFormContext.Provider>
  );
}

function reducer(state: _MultiStepForm, action: _MultiStepFormAction) {
  const type = action.type;
  switch (type) {
    case 'incrementIndex':
      console.log('no');
      return {
        ...state,
        steps: {
          ...state.steps,
        },
        index: state.index + 1,
      };
    case 'decrementIndex':
      return {
        ...state,
        index: state.index - 1,
      };
    case 'username':
      return {
        ...state,
        steps: {
          ...state.steps,
          0: {
            ...state.steps[0],
            username: action.payload,
          },
        },
      };
    case 'displayName':
      return {
        ...state,
        steps: {
          ...state.steps,
          1: {
            ...state.steps[1],
            displayName: action.payload,
          },
        },
      };
    case 'birthDate':
      return {
        ...state,
        steps: {
          ...state.steps,
          1: {
            ...state.steps[1],
            birthDate: action.payload,
          },
        },
      };
    case 'bio':
      return {
        ...state,
        steps: {
          ...state.steps,
          2: {
            ...state.steps[2],
            bio: action.payload,
          },
        },
      };
    case 'location':
      return {
        ...state,
        steps: {
          ...state.steps,
          2: {
            ...state.steps[2],
            location: action.payload,
          },
        },
      };
    default:
      throw new Error();
  }
}
