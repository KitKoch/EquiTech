namespace Services
{
    public interface IIdentityProvider<T>
    {
        T GetCurrentUserId();
    }
}