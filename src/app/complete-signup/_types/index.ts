type _MultiStepForm = {
  index: number;
  steps: {
    0: {
      username: string;
    };
    1: {
      displayName: string;
      birthDate: string;
    };
    2: {
      bio: string | undefined;
      location: string | undefined;
    };
  };
};

type _MultiStepFormContext = {
  state: _MultiStepForm;
  dispatch: React.Dispatch<_MultiStepFormAction>;
};

type _MultiStepFormAction = {
  type:
    | 'incrementIndex'
    | 'decrementIndex'
    | 'username'
    | 'displayName'
    | 'birthDate'
    | 'bio'
    | 'location';
  payload: string;
};
