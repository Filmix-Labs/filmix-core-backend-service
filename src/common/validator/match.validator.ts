import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export function Match<T>(
  _type: new () => T,
  property: (o: T) => unknown,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match', async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    const [propertyFn] = args.constraints as [(o: unknown) => unknown];
    const comparedValue = propertyFn(args.object);

    return comparedValue === value;
  }

  defaultMessage(args: ValidationArguments): string {
    const [propertyFn] = args.constraints as [(o: unknown) => unknown];
    const fieldName = this.extractPropertyName(propertyFn);

    return `${fieldName} and ${args.property} do not match`;
  }

  private extractPropertyName(fn: (o: unknown) => unknown): string {
    const source = fn.toString();
    const match = source.match(/return\s+.*?\.(\w+);?/);
    return match?.[1] ?? 'Property';
  }
}
