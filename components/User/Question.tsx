import { useState } from "react";
import _ from "lodash";
import { CheckBox } from "rn-inkpad";

const Question = (props) => {
  const { data } = props;

  const [checked, setIsChecked] = useState(false);

  return (
    <>
      <CheckBox
        checked={checked}
        iconColor={"#DB504A"}
        iconSize={25}
        textStyle={{ fontSize: 20 }}
        onChange={setIsChecked}
        title={data}
      />
    </>
  );
};

export default Question;
