export default function LoginForm() {
    return(
        <form>
            <div className="flex">
                <div className="flex">
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" id="username" required/>
                </div>
                <div className="flex">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required/>
                </div>
            </div>
            <input type="submit" value="Log In" />
        </form>
    )
}