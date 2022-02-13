import { all, call, takeLatest, put, CallEffect, PutEffect } from "redux-saga/effects";
import { toast } from "react-toastify";
import history from "~/services/history";
import api from "../../../services/api";
import { signInSuccess, signInFailure } from "./actions";

interface Props {
  payload: {
    email: string;
    password: string;
    auth: {
      token: string;
    };
  };
}

export function* singIn({ payload }: Props): Generator<
  | CallEffect<unknown>
  | PutEffect<{
      type: string;
    }>,
  void,
  unknown
> {
  try {
    const { email, password } = payload;
    const response: any = yield call(api.post, "sessions", {
      email,
      password,
    });
    const { user, token } = response.data;

    yield put(signInSuccess(token, user));

    history.push("/deliveries");
  } catch (err) {
    toast.error("Falha ao entrar no Sistema");
    yield put(signInFailure());
  }
}

export function setToken({ payload }: Props): void {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export function singOut(): void {
  toast.success("Sessão encerrada com sucesso!");
  history.push("/");
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", singIn),
  takeLatest("@auth/SIGN_OUT", singOut),
]);
