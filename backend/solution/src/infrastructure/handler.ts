import Request from './request';

export default abstract class Handler<TRequest extends Request, TResult> {
  abstract handle(request: TRequest): Promise<TResult>;
}
