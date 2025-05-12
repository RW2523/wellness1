package main;

public class user {
    private final String username;
    private final String password;
    private final String role;
    private final String email;
    public user(String username, String pass, String email, String role)
    {
        this.username=username;
        this.password=pass;
        this.email=email;
        this.role=role;
    }
    public String getusername()
    {
        return this.username;
    }
    public String getpass()
    {
        return this.password;
    }
     public String getemail()
    {
        return this.email;
    }
     public String getrole()
    {
        return this.role;
    }


}
