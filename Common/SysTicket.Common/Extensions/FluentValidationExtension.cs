using FluentValidation;

namespace SysTicket.Common.Extensions
{
    public static class FluentValidationExtension
    {
        public static IRuleBuilder<T, TProperty> IsId<T, TProperty>(this IRuleBuilder<T, TProperty> ruleBuilder) where TProperty : IComparable<TProperty>, IComparable
        {
            if (typeof(TProperty) == typeof(int))
            {
                return ruleBuilder.GreaterThanOrEqualTo((TProperty)(object)1);
            }

            return ruleBuilder;
        }
    }
}