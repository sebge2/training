import {Activity} from "./activity.ts";
import {Duration} from "./duration.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityDeserializer} from "./activity-deserializer.ts";
import {ForTimeDto} from "../dto/activity/for-time.dto.ts";
import {v4 as uuidv4} from "uuid";
import {TaskSet} from "../board/task-set.ts";
import {Task} from "../board/task.ts";
import {BoardTextInfo} from "../board/board-text-info.ts";

export class ForTime implements Activity {

    static fromDto(dto: ForTimeDto): ForTime {
        return new ForTime(
            Duration.fromDto(dto.duration) as Duration,
            ActivityDeserializer.deserialize(dto.activity),
            dto.comment
        );
    }

    public readonly id: string;

    constructor(
        public readonly duration: Duration,
        public readonly activity: Activity,
        public readonly comment: string | undefined,
    ) {
        this.id = uuidv4();
    }

    get type(): ActivityType {
        return ActivityType.FOR_TIME;
    }

    toSequencerTasks(parent: BoardTextInfo): TaskSet {
        return new TaskSet([
            new Task(
                this.id,
                parent,
                this.duration
            )
        ]);
    }
}