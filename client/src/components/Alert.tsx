import style from "@/styles/form.module.css";
import {Badge, Card, Text} from "@nextui-org/react";

function Alert({ error }: { error: string }) {
    return <div className={style.error_container}>
        <Card
            isHoverable
            variant="bordered"
            css={{
                display: `${error ? "flex" : "none"}`,
                py: ".5rem",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                $$cardColor: "$colors$error",
                gap: ".5rem",
            }}
            borderWeight="normal"

        >
            <Badge size="md" isSquared color="error" variant="flat">Error</Badge>

            <Text size="16px" css={{textAlign: "center"}} color="#fff">
                {error}
            </Text>
        </Card>
    </div>;
}

export default Alert;