type _StepState = {
  index: number;
  username: string;
  displayName: string;
  birthDay: Date;
};

type _StepContext = {
  state: _StepState;
  dispatch: React.Dispatch<_StepAction>;
};

type _StepAction =
  | {
      type: "next" | "prev";
    }
  | {
      type: "step1";
      payload: string;
    }
  | {
      type: "step2";
      payload: {
        displayName: string;
        birthDay: Date;
      };
    };

type _StepServerAction =
  | {
      success: true;
      redirect: boolean;
    }
  | {
      success: false;
      error: string;
    };
