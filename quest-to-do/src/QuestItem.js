import { useState } from "react";

export default function QuestItem(props) {
    const [title, setTitle] = useState(props.quest.title);
    const [checked, setChecked] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const concluded = props.quest.status === "concluido";

    return (
        <div className="flex gap-4 flex-col md:flex-row items-center"
        data-testid="quest-item">
            <div className="flex gap-4 items-center w-full sm:w-[80%]">
                <input
                    disabled={concluded}
                    type="checkbox"
                    checked={checked}
                    className="checkbox rounded-full border"
                    onChange={() => {
                        if (concluded) return;
                        else {
                            setChecked(!checked);
                            props.saveConcludedQuest(props.quest);
                        }
                    }}
                />

                {editMode && !concluded ? (
                    <input
                        placeholder="quest"
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="rounded-full bg-secondary pl-2 w-full input-sm flex focus:outline-none"

                        data-testid="edit-input"
                    />
                ) : (
                    <p className={`break-words ${concluded ? "line-through" : ""}`} data-testid="quest-title">
                        {props.quest.title}
                    </p>
                )}
            </div>

            {!concluded && (
                <div className="flex gap-4 w-full sm:w-fit justify-center"data-testid="quest-buttons">
                    <button
                    data-testid="edit-button"
                    onClick={() => {
                        if (editMode) props.saveEditQuest(props.quest, title);
                        setEditMode(!editMode);
                    }}>Editar</button>
                    <button
                     data-testid="delete-button"
                     onClick={() => {
                        if (concluded) return;
                        else props.saveDeleteQuest(props.quest);
                    }}>Excluir</button>
                </div>
            )}
        </div>
    )
}