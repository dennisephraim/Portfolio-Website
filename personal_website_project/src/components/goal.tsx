interface GoalProps {
    questTitle: string;
    tasks: { name: string }[];
}

export default function Goal({ questTitle, tasks}: GoalProps) {
    return (
        <div className="text-center w-[60%] mx-auto items-center">
            <div className="table-fixed bg-blue-500 py-6 px-6">
                <div className="pb-3 text-lg">
                    QUEST INFO
                </div>
                <div className="pb-5">
                    <p className="pb-2">DAILY QUEST - {questTitle}</p>
                    <p className="pb-2">GOALS</p>
                    <div className=" mx-10">
                        {tasks.map((task, index: number) => (
                            <div key={index} className="flex flex-row justify-between">
                                <label >{task.name}</label>
                                <input type="checkbox" />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="pb-2 text-sm">WARNING: Failure to complete the daily quest will result in an appropriate penalty</p>
                    <input type="checkbox" />
                </div>
            </div>
        </div>
    )
}