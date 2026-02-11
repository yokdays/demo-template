
import ProgressBar from "./components/progress-bar";
import Progress from "./components/Progress";
export default function App() {

  return (
    <>
      <div className="min-h-screen flex justify-center py-4">
        <div className="space-y-4 w-[80vw] bg-white p-6 rounded-lg shadow-md">
          <p className="text-4xl font-semibold text-slate-800 text-[#fe5000]">
            โครงการเก็บรวบรวมข้อมูลเชิงปริมาณเพื่อประเมินการรับรู้ <br />
            และการยอมรับของสังคมต่อบทบาทสื่อสาธารณะของ ส.ส.ท.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProgressBar
              heading="ภาพรวมการเก็บข้อมูล"
              value={200}
              total={4738}
            />
            <ProgressBar
              heading="จำนวนการเก็บข้อมูลเพศชาย"
              value={120}
              total={200}
            />
            <ProgressBar
              heading="จำนวนการเก็บข้อมูลเพศหญิง"
              value={80}
              total={200}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Progress />
          </div>
        </div>
      </div>
    </>
  );
}
