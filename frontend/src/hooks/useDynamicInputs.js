//controls the number of poll questions a user can add or remove
import { useState } from "react"

const useDynamicInputs = () => {
    const [inputs, setInputs] = useState(['', '']);

    const handleAddInput = () => {
        if (inputs.length >= 5) return;
        setInputs([...inputs, ""]);

    };

    const handleChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleRemoveInput = (index) => {
        if (inputs.length <= 2) return;
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    };

    const handleRemoveFirstEmpty = () => {
        if (inputs.length > 2) {
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