import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default () => {

    const router = useRouter();

    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)

    useEffect(() => {
        document.body.className = 'hold-transition login-page';
    },[]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setError(null)

            const result = await signIn("admin", { redirect: false, email, password });
            if (!!result.error) throw { message: "Wrong Username and/or Password" }

            router.push("/")
        } catch (ex) {
            console.log(`Login Failed`, ex.message)
            setError(ex.message)
        }
    }
    
    return (
        <>
            <div className="login-box">
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        {!!error &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {error}
                                <button type="button" className="close" onClick={() => setError(null)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }

                        <div>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" value={remember} onChange={(e) => setRemember(!remember)} />
                                        <label htmlFor="remember">&nbsp; Remember Me</label>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block" onClick={submitHandler}>Sign In</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}