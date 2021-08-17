'use strict';
exports.__esModule = true;
exports.CreateBrand = void 0;
var core_1 = require('@material-ui/core');
var react_1 = require('@redux-requests/react');
var final_form_calculate_1 = require('final-form-calculate');
var NftType_1 = require('modules/api/common/NftType');
var InputField_1 = require('modules/form/components/InputField');
var SelectField_1 = require('modules/form/components/SelectField');
var UploadAvatarField_1 = require('modules/form/components/UploadAvatarField');
var intl_1 = require('modules/i18n/utils/intl');
var GoBack_1 = require('modules/layout/components/GoBack');
var Button_1 = require('modules/uiKit/Button');
var Section_1 = require('modules/uiKit/Section');
var react_2 = require('react');
var react_final_form_1 = require('react-final-form');
var react_router_1 = require('react-router');
var question_svg_1 = require('../../../common/assets/question.svg');
var unit_1 = require('../../../common/types/unit');
var ProfileRoutes_1 = require('../../../profile/ProfileRoutes');
var createBrand_1 = require('../../actions/createBrand');
var MAX_SIZE = 31457280;
var FILE_ACCEPTS = ['image/png', 'image/jpeg', 'image/jp2', 'image/jpm'];
var NAME_CHARACTER_LIMIT = 30;
var SYMBOL_CHARACTER_LIMIT = 15;
var DESCRIPTION_CHARACTER_LIMIT = 200;
// https://final-form.org/docs/react-final-form/examples#calculated-fields
var brandSymbolDecorator = final_form_calculate_1['default']({
  field: 'brandName',
  updates: {
    brandSymbol: function (_ignoredValue, allValues) {
      var brandName = allValues.brandName;
      if (brandName) {
        return brandName.replace(/\s/g, '').slice(0, 3).toUpperCase();
      }
    },
  },
});
var validateCreateBrand = function (payload) {
  var errors = {};
  if (!payload.brandName) {
    errors.brandName = intl_1.t('validation.required');
  } else {
    var reg = /^[^`'"“‘]{0,32}$/g;
    if (!reg.test(payload.brandName)) {
      errors.brandName = intl_1.t('validation.invalid-name');
    }
  }
  if (!payload.brandSymbol) {
    errors.brandSymbol = intl_1.t('validation.required');
  }
  if (!payload.file) {
    errors.file = intl_1.t('validation.required');
  } else if (!FILE_ACCEPTS.includes(payload.file.type)) {
    errors.file = intl_1.t('validation.invalid-type');
  } else if (payload.file.size > MAX_SIZE) {
    errors.file = intl_1.t('validation.max-size', {
      value: unit_1.convertBytesToMegabytes(MAX_SIZE),
    });
  }
  return errors;
};
exports.CreateBrand = function () {
  var dispatch = react_1.useDispatchRequest();
  var replace = react_router_1.useHistory().replace;
  var standardOptions = react_2.useMemo(function () {
    return [
      {
        label: intl_1.t(
          'create-nft.standardOption.' + NftType_1.NftType.ERC721,
        ),
        value: NftType_1.NftType.ERC721,
      },
      {
        label: intl_1.t(
          'create-nft.standardOption.' + NftType_1.NftType.ERC1155,
        ),
        value: NftType_1.NftType.ERC1155,
      },
    ];
  }, []);
  var handleSubmit = react_2.useCallback(
    function (payload) {
      dispatch(createBrand_1.createBrand(payload)).then(function (_a) {
        var error = _a.error;
        if (!error) {
          replace(
            ProfileRoutes_1.ProfileRoutesConfig.UserProfile.generatePath(
              ProfileRoutes_1.ProfileTab.collections,
            ),
          );
        }
      });
    },
    [dispatch, replace],
  );
  var renderForm = function (_a) {
    var handleSubmit = _a.handleSubmit;
    return react_2['default'].createElement(
      core_1.Box,
      { component: 'form', onSubmit: handleSubmit },
      react_2['default'].createElement(
        core_1.Box,
        { mb: 5 },
        react_2['default'].createElement(react_final_form_1.Field, {
          component: InputField_1.InputField,
          name: 'brandName',
          type: 'text',
          label: intl_1.t('collection.create.label.collection-name'),
          color: 'primary',
          fullWidth: true,
          autoFocus: true,
          showLimitCounter: true,
          inputProps: {
            maxLength: NAME_CHARACTER_LIMIT,
          },
        }),
      ),
      react_2['default'].createElement(
        core_1.Box,
        { mb: 5 },
        react_2['default'].createElement(react_final_form_1.Field, {
          component: SelectField_1.SelectField,
          name: 'standard',
          type: 'text',
          label: react_2['default'].createElement(
            core_1.Box,
            { display: 'flex', alignItems: 'center' },
            intl_1.t('create-nft.label.standard'),
            react_2['default'].createElement(
              core_1.Tooltip,
              {
                title: react_2['default'].createElement(
                  react_2['default'].Fragment,
                  null,
                  react_2['default'].createElement(
                    'p',
                    null,
                    intl_1.t('collection.create.tip-warning.ERC721'),
                  ),
                  react_2['default'].createElement(
                    'p',
                    null,
                    intl_1.t('collection.create.tip-warning.ERC1155'),
                  ),
                ),
              },
              react_2['default'].createElement(
                core_1.Box,
                { component: 'i', ml: 1 },
                react_2['default'].createElement(
                  question_svg_1.ReactComponent,
                  null,
                ),
              ),
            ),
          ),
          color: 'primary',
          fullWidth: true,
          options: standardOptions,
        }),
      ),
      react_2['default'].createElement(
        core_1.Box,
        { mb: 5 },
        react_2['default'].createElement(react_final_form_1.Field, {
          component: InputField_1.InputField,
          name: 'brandSymbol',
          type: 'text',
          color: 'primary',
          fullWidth: true,
          label: react_2['default'].createElement(
            core_1.Box,
            { display: 'flex', alignItems: 'center' },
            intl_1.t('collection.create.label.collection-symbol'),
            react_2['default'].createElement(
              core_1.Tooltip,
              {
                title: intl_1.t(
                  'collection.create.tip-warning.collection-symbol',
                ),
              },
              react_2['default'].createElement(
                core_1.Box,
                { component: 'i', ml: 1 },
                react_2['default'].createElement(
                  question_svg_1.ReactComponent,
                  null,
                ),
              ),
            ),
          ),
          showLimitCounter: true,
          inputProps: {
            maxLength: SYMBOL_CHARACTER_LIMIT,
          },
        }),
      ),
      react_2['default'].createElement(
        core_1.Box,
        { mb: 5 },
        react_2['default'].createElement(react_final_form_1.Field, {
          component: InputField_1.InputField,
          name: 'description',
          type: 'text',
          label: react_2['default'].createElement(
            core_1.Box,
            { display: 'flex', alignItems: 'center' },
            intl_1.t('collection.create.label.description'),
            react_2['default'].createElement(
              core_1.Tooltip,
              { title: intl_1.t('collection.create.tip-warning.description') },
              react_2['default'].createElement(
                core_1.Box,
                { component: 'i', ml: 1 },
                react_2['default'].createElement(
                  question_svg_1.ReactComponent,
                  null,
                ),
              ),
            ),
          ),
          color: 'primary',
          fullWidth: true,
          rowsMax: 10,
          multiline: true,
          showLimitCounter: true,
          inputProps: {
            maxLength: DESCRIPTION_CHARACTER_LIMIT,
          },
        }),
      ),
      react_2['default'].createElement(
        core_1.Box,
        { mb: 5 },
        react_2['default'].createElement(react_final_form_1.Field, {
          component: UploadAvatarField_1.UploadAvatarField,
          name: 'file',
          label: intl_1.t('collection.create.label.collection-avatar'),
          accepts: FILE_ACCEPTS,
        }),
      ),
      react_2['default'].createElement(
        core_1.Box,
        null,
        react_2['default'].createElement(
          react_1.Mutation,
          { type: createBrand_1.createBrand.toString() },
          function (_a) {
            var loading = _a.loading;
            return react_2['default'].createElement(
              Button_1.Button,
              {
                size: 'large',
                type: 'submit',
                fullWidth: true,
                loading: loading,
              },
              loading
                ? intl_1.t('common.submitting')
                : intl_1.t('collection.create.create-collection'),
            );
          },
        ),
      ),
    );
  };
  return react_2['default'].createElement(
    Section_1.Section,
    null,
    react_2['default'].createElement(
      core_1.Container,
      { maxWidth: 'sm' },
      react_2['default'].createElement(
        core_1.Box,
        { mb: 3.5 },
        react_2['default'].createElement(GoBack_1.GoBack, null),
      ),
      react_2['default'].createElement(
        core_1.Box,
        { mb: 6 },
        react_2['default'].createElement(
          core_1.Typography,
          { variant: 'h1' },
          intl_1.t('collection.create.create-collection'),
        ),
      ),
      react_2['default'].createElement(
        core_1.Box,
        null,
        react_2['default'].createElement(react_final_form_1.Form, {
          onSubmit: handleSubmit,
          render: renderForm,
          validate: validateCreateBrand,
          decorators: [brandSymbolDecorator],
          initialValues: {
            standard: NftType_1.NftType.ERC721,
          },
        }),
      ),
    ),
  );
};
