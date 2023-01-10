import FirstStep from "@src/Components/Form/FirstStep";
import SecondStep from "@src/Components/Form/SecondStep";
import ThirdStep from "@src/Components/Form/ThirdStep";
import FinalStep from "@src/Components/Form/FinalStep"
import Result from "@src/Components/Form/Result"

export const steps = [
  {
    key: 0,
    component: FirstStep,
  },
  {
    key: 1,
    component: SecondStep,
  },
  {
    key: 2,
    component: ThirdStep,
  },
  {
    key: 3,
    component: FinalStep,
  },
  {
    key: 4,
    component: Result,
  },
];
