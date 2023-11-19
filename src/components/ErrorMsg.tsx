import SvgAlertFill from '../../public/images/alert-circle-fill.svg';
import SvgAlert from '../../public/images/alert-circle.svg';
type ErrorMsgTypes = {
  name: string;
  errors: string;
  touched: boolean;
};

export default function ErrorMsg({ name, errors, touched }: ErrorMsgTypes) {
  if (!touched || !errors) return null;
  return (
    <div className="flex">
      <div className="h-3 mr-1">
        <SvgAlertFill fill="#ef4444" width="17" height="19" />
      </div>
      <p className="text-red-500 text-sm">{errors}</p>
    </div>
  );
}
