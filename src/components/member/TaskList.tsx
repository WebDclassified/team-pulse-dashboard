import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateTaskProgress } from "../../redux/slices/membersSlice";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { currentUserId } = useAppSelector(state => state.role);
  const member = useAppSelector(state =>
    state.members.list.find(m => m.id === currentUserId)
  );

  if (!member) return null;

  const changeProgress = (taskId: string, delta: number) => {
    dispatch(updateTaskProgress({ memberId: member.id, taskId, delta }));
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <h2 className="font-semibold mb-3">Your Tasks</h2>
      {member.tasks.length === 0 && (
        <p className="text-sm text-slate-500">No tasks assigned yet.</p>
      )}

      <div className="space-y-3">
        {member.tasks.map(task => (
          <div
            key={task.id}
            className="border rounded-lg p-3 text-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-xs text-slate-500">
                  Due: {task.dueDate}
                </p>
              </div>
              {task.completed && (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Completed
                </span>
              )}
            </div>

            <div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${task.progress}%` }}
                  className="h-2 bg-indigo-500"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>{task.progress}%</span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => changeProgress(task.id, -10)}
                    className="px-2 py-1 border rounded text-xs"
                  >
                    -10%
                  </button>
                  <button
                    type="button"
                    onClick={() => changeProgress(task.id, +10)}
                    className="px-2 py-1 border rounded text-xs"
                  >
                    +10%
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
