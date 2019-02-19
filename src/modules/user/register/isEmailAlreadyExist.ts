import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraintInterface,
  ValidatorConstraint
} from "class-validator";

import User from "../../../entity/User";

@ValidatorConstraint({ async: true })
export class IsEmailAlreayExistConstraint
  implements ValidatorConstraintInterface {
  validate(email: string): boolean | Promise<boolean> {
    return User.findOne({ where: { email } }).then(user => {
      if (user) return false;
      return true;
    });
  }
}

export function IsEmailAlreayExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreayExistConstraint
    });
  };
}
