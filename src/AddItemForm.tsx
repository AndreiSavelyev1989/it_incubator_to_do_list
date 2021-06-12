import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import green from "@material-ui/core/colors/green";
import TextField from "@material-ui/core/TextField";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('render AddItemForm')
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setTitle(e.currentTarget.value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAddItemClick()
        }
    }

    const onAddItemClick = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                label={"Add new title"}
                size={"small"}
                helperText={error}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
            />
            <IconButton onClick={onAddItemClick}>
                <Icon style={{color: green[500]}}>+</Icon>
            </IconButton>
        </div>
    )
})