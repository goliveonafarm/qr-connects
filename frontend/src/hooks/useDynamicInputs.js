import { set } from "mongoose";
import { useState } from "react"

const useDynamicInputs = () => {
    const [inputs, setInputs] = useState(['']);

    const handleAddInput = () => {
        setInputs([...inputs, ""]);
    };

    const handleChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleRemoveInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    };

    const handleRemoveFirstEmpty = () => {
        if (inputs.length > 1) {
            inputs.forEach((input, index) => {
                if (input.trim() === "") {
                    const newInputs = inputs.filter((_, i) => i !== index);
                    setInputs(newInputs);
                    return;
                }
            });
        }
    }

    return {
        inputs,
        handleAddInput,
        handleChange,
        handleRemoveInput,
        handleRemoveFirstEmpty
    }
}

export default useDynamicInputs