import QuestItem from "./QuestItem";
import { render, screen, fireEvent } from "@testing-library/react";
import { test, describe, expect } from "@jest/globals";

const createdQuest = {
    id: 1,
    title: "Falar com o ferreiro",
    status: "aberto",
    created_at: new Date(Date.now()).toUTCString(),
};

const concludedQuest = {
    id: 2,
    title: "Falar com o ferreiro",
    status: "concluido",
    created_at: new Date(Date.now()).toUTCString(),
};

describe("Testando item", () => {
    test("testando se o item está visível", () => {
        render(<QuestItem quest={createdQuest} />);

        expect(screen.getByTestId("quest-item")).toBeVisible();

        expect(screen.getByTestId("quest-title").textContent).toBe("falar com o Ferreiro");
    });
    test("testando se a edição está acessível", () => {
        render(<QuestItem quest={createdQuest} />);

        expect(screen.getByTestId("edit-button")).toBeVisible();

        fireEvent.click(screen.getByTestId("edit-button"));

        expect(screen.getByTestId("edit-input")).toBeVisible();

        expect(screen.getByTestId("edit-input")).toHaveValue("falar com o Ferreiro");
    });

    test("testando se edição é bloqueada quando concluída", () => {
        render (<QuestItem quest={concludedQuest} />);
        expect(screen.getByTestId("edit-input")).toBeNull();
    });
});
